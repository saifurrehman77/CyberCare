
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import BertForSequenceClassification, BertTokenizer, AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax


app = FastAPI()

# CORS middleware setup for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://192.168.0.105:8000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    comments: List[str]

class SentimentDetail(BaseModel):
    comment: str
    probabilities: dict

class SentimentResponse(BaseModel):
    total_comments: int
    positive: int
    neutral: int
    negative: int
    details: List[SentimentDetail]

# Function to preprocess text (generic placeholder)
def preprocess(text):
    return text.replace("@user", "")

# Sentiment Analysis Endpoint
@app.post("/sentimentanalysis/")
async def analyze_comments(data: InputData):
    results = []
    summary = {"total_comments": len(data.comments), "positive": 0, "neutral": 0, "negative": 0}
    for comment in data.comments:
        preprocessed_text = preprocess(comment)
        encoded_input = sentiment_tokenizer(preprocessed_text, return_tensors='pt').to(device)
        output = sentiment_model(**encoded_input)
        probabilities = softmax(output.logits.detach().cpu().numpy()[0])
        labels = ['negative', 'neutral', 'positive']  # Adjust based on your model's specific configuration
        probabilities_dict = {labels[i]: float(probabilities[i]) for i in range(len(probabilities))}
        results.append(SentimentDetail(comment=comment, probabilities=probabilities_dict))
        max_label = max(probabilities_dict, key=probabilities_dict.get)
        summary[f"{max_label}"] += 1

    return SentimentResponse(
        total_comments=summary["total_comments"],
        positive=summary["positive"],
        neutral=summary["neutral"],
        negative=summary["negative"],
        details=results
    )


# Model paths and token
racism_model_path = 'E:\\Downloads\\bert_racism_model'
hatespeech_model_path = 'E:Downloads\\bert_hatespeech_model_state_dict.pth'
sexism_model_path = 'E:\\Downloads\\bert_sexism_model'
model_id = "Nasserelsaman/microsoft-finetuned-personality"
token = "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"
sentiment_model_id = "cardiffnlp/twitter-roberta-base-sentiment-latest"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Tokenizers and Models Initialization
tokenizer_bert = BertTokenizer.from_pretrained('bert-base-uncased')
tokenizer_auto = AutoTokenizer.from_pretrained(model_id, use_auth_token=token)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_model_id)
sentiment_model = AutoModelForSequenceClassification.from_pretrained(sentiment_model_id).to(device)

# Load Models
racism_model = BertForSequenceClassification.from_pretrained(racism_model_path, num_labels=2).to(device)
hatespeech_model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
hatespeech_model.load_state_dict(torch.load(hatespeech_model_path, map_location=device))
hatespeech_model = hatespeech_model.to(device)
sexism_model = BertForSequenceClassification.from_pretrained(sexism_model_path, num_labels=2).to(device)
personality_model = AutoModelForSequenceClassification.from_pretrained(model_id, use_auth_token=token).to(device)

def predict_category_with_comment(comment: str, model, tokenizer) -> dict:
    encoded_comment = tokenizer.encode_plus(
        comment,
        add_special_tokens=True,
        max_length=256,
        return_tensors='pt',
        padding='max_length',
        truncation=True,
    )
    encoded_comment = {k: v.to(device) for k, v in encoded_comment.items()}
    with torch.no_grad():
        outputs = model(**encoded_comment)
    predicted_class = torch.argmax(outputs.logits, dim=1).item()
    return {"comment": comment, "prediction": predicted_class}

@app.get("/")
def read_root():
    return {"message": "Service is running"}

@app.post("/predict/racism/")
async def predict_racism(data: InputData):
    predictions = [predict_category_with_comment(comment, racism_model, tokenizer_bert) for comment in data.comments]
    detailed_predictions = []
    for item in predictions:
        label = "Racist" if item["prediction"] == 1 else "Not Racist"
        detailed_predictions.append({"comment": item["comment"], "prediction": label})
    racism_counts = {"Racist": 0, "Not Racist": 0}
    for item in detailed_predictions:
        racism_counts[item["prediction"]] += 1
    return {
        "Total Comments": len(data.comments),
        "Racist Comments": racism_counts["Racist"],
        "Non-Racist Comments": racism_counts["Not Racist"],
        "Details": detailed_predictions,
    }

@app.post("/predict/sexism/")
async def predict_sexism(data: InputData):
    predictions = [predict_category_with_comment(comment, sexism_model, tokenizer_bert) for comment in data.comments]
    detailed_predictions = []
    for item in predictions:
        label = "Sexist" if item["prediction"] == 1 else "Not Sexist"
        detailed_predictions.append({"comment": item["comment"], "prediction": label})
    sexism_counts = {"Sexist": 0, "Not Sexist": 0}
    for item in detailed_predictions:
        sexism_counts[item["prediction"]] += 1
    return {
        "Total Comments": len(data.comments),
        "Sexist Comments": sexism_counts["Sexist"],
        "Non-Sexist Comments": sexism_counts["Not Sexist"],
        "Details": detailed_predictions,
    }

@app.post("/predict/hatespeech/")
async def classify_comments(data: InputData):
    predictions = [predict_category_with_comment(comment, hatespeech_model, tokenizer_bert) for comment in data.comments]
    detailed_predictions = []
    for item in predictions:
        if item["prediction"] == 0:
            label = "Hate Speech"
        elif item["prediction"] == 1:
            label = "Offensive"
        else:
            label = "Neither"
        detailed_predictions.append({"comment": item["comment"], "prediction": label})
    hate_speech_counts = {"Hate Speech": 0, "Offensive": 0, "Neither": 0}
    for item in detailed_predictions:
        hate_speech_counts[item["prediction"]] += 1
    return {
        "Total Comments": len(data.comments),
        "Hate Speech Comments": hate_speech_counts["Hate Speech"],
        "Offensive Comments": hate_speech_counts["Offensive"],
        "Neither": hate_speech_counts["Neither"],
        "Details": detailed_predictions,
    }

# Personality traits prediction endpoint
@app.post("/personalitytraits/")
async def predict_personality_traits(data: InputData):
    results = personality_detection(data.comments)
    trait_counts = {trait: 0 for trait in ['Agreeableness', 'Conscientiousness', 'Extraversion', 'Neuroticism', 'Openness']}
    for result in results.values():
        for trait, score in result.items():
            if score >= 0.5:  # Dominant trait threshold
                trait_counts[trait] += 1
    return {
        "Total Comments": len(data.comments),
        "Agreeableness": trait_counts['Agreeableness'],
        "Conscientiousness": trait_counts['Conscientiousness'],
        "Extraversion": trait_counts['Extraversion'],
        "Neuroticism": trait_counts['Neuroticism'],
        "Openness": trait_counts['Openness'],
        "Details": results
    }

def personality_detection(texts):
    results = {}
    for text in texts:
        inputs = tokenizer_auto(text, truncation=True, padding=True, return_tensors="pt")
        outputs = personality_model(**inputs)
        predictions = torch.sigmoid(outputs.logits).squeeze().detach().numpy()
        label_names = ['Agreeableness', 'Conscientiousness', 'Extraversion', 'Neuroticism', 'Openness']
        result = {label_names[i]: float(predictions[i]) for i in range(len(label_names))}
        results[text] = result
    return results


