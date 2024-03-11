from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import numpy as np
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

allowed_origins = [
    "http://localhost:8000",  # Allows requests from localhost:8000
    "http://192.168.0.105:8000",  # Replace with your machine's local network IP and port
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)



# Define the number of labels (adjust this according to your original model)
num_labels = 3  # For example, if you have a binary classification model

# Define the model architecture
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=num_labels)

# Load the pre-trained weights
model.load_state_dict(torch.load('C:\\Users\\HP\\Downloads\\bert_hatespeech_model_state_dict.pth', map_location=torch.device('cpu')))


# Set the model to evaluation mode
model.eval()

# Move the model to the CPU
model = model.to(torch.device('cpu'))

# Load the tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

class InputData(BaseModel):
    comments: List[str]


@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Define the predict endpoint
@app.post("/predict")
def predict(data: InputData):
    # Extract input comments from request
    comments = data.comments

    results = []
    for comment in comments:
        # Tokenize each comment
        inputs = tokenizer(comment, return_tensors="pt", truncation=True)

        # Forward pass through the loaded model
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the predicted class probabilities
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

        # Get the predicted class index
        predicted_class_index = torch.argmax(probs).item()

        # Map the predicted index to the corresponding label
        labels = ["offensive", "hatespeech", "neither"]
        predicted_label = labels[predicted_class_index]

        # Convert probabilities to percentages
        probs_percentage = (probs * 100).cpu().numpy().tolist()

        # Append result for the current comment
        results.append({"comment": comment, "predicted_label": predicted_label, "predicted_probabilities": probs_percentage})

    return results
