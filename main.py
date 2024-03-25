# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import BertTokenizer, BertForSequenceClassification
# import torch
# import numpy as np
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# allowed_origins = [
#     "http://localhost:8000",  # Allows requests from localhost:8000
#     "http://192.168.0.105:8000",  # Replace with your machine's local network IP and port
#     # Add other origins as needed
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=allowed_origins,
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )



# # Define the number of labels (adjust this according to your original model)
# num_labels = 3  # For example, if you have a binary classification model

# # Define the model architecture
# model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=num_labels)

# # Load the pre-trained weights
# model.load_state_dict(torch.load('C:\\Users\\HP\\Downloads\\bert_hatespeech_model_state_dict.pth', map_location=torch.device('cpu')))


# # Set the model to evaluation mode
# model.eval()

# # Move the model to the CPU
# model = model.to(torch.device('cpu'))

# # Load the tokenizer
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# class InputData(BaseModel):
#     comments: List[str]


# @app.get("/")
# def read_root():
#     return {"message": "Hello World"}

# # Define the predict endpoint

# @app.post("/predict")
# def predict(data: InputData):
#     comments = data.comments

#     # Initialize counters
#     totals = {"hatespeech": 0, "offensive": 0, "neither": 0}

#     for comment in comments:
#         inputs = tokenizer(comment, return_tensors="pt", truncation=True)
#         with torch.no_grad():
#             outputs = model(**inputs)

#         probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
#         predicted_class_index = torch.argmax(probs).item()
#         labels = ["hatespeech", "offensive", "neither"]
#         predicted_label = labels[predicted_class_index]

#         # Increment the appropriate counter based on predicted label
#         if predicted_label in totals:
#             totals[predicted_label] += 1

#     # Calculate total comments
#     total_comments = sum(totals.values())

#     return {
#         "total_comments": total_comments,
#         "hatespeech_comments": totals["hatespeech"],
#         "offensive_comments": totals["offensive"],
#         "neither_comments": totals["neither"]
#     }

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import torch
# from transformers import BertForSequenceClassification, BertTokenizer
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # CORS middleware setup
# allowed_origins = [
#     "http://localhost:8000",
#     "http://192.168.0.105:8000",
#     # Add other origins as needed
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=allowed_origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Input data model
# class InputData(BaseModel):
#     comments: List[str]

# # Model paths
# racism_model_path = 'C:\\Users\\HP\\Downloads\\bert_racism_model'
# hatespeech_model_path = 'C:\\Users\\HP\\Downloads\\bert_hatespeech_model_state_dict.pth'
# sexism_model_path = 'C:\\Users\\HP\\Downloads\\bert_sexism_model'  # Adjust with the actual path

# # Loading models and tokenizer
# racism_model = BertForSequenceClassification.from_pretrained(racism_model_path, num_labels=2, local_files_only=True)
# hatespeech_model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
# hatespeech_model.load_state_dict(torch.load(hatespeech_model_path, map_location=torch.device('cpu')))
# sexism_model = BertForSequenceClassification.from_pretrained(sexism_model_path, local_files_only=True)  # Load sexism model

# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# racism_model.to(device)
# hatespeech_model.to(device)
# sexism_model.to(device)  # Ensure sexism model is moved to the appropriate device

# # Prediction functions
# def predict_category(comment: str, model) -> int:
#     encoded_comment = tokenizer.encode_plus(
#         comment,
#         add_special_tokens=True,
#         max_length=256,
#         return_tensors='pt',
#         padding='max_length',
#         truncation=True
#     ).to(device)
    
#     with torch.no_grad():
#         outputs = model(**encoded_comment)
#     predicted_class = torch.argmax(outputs.logits, dim=1).item()
#     return predicted_class

# @app.get("/")
# def read_root():
#     return {"message": "Hello World"}

# @app.post("/PredictComments/")
# async def predict_comments(data: InputData):
#     comments = data.comments
#     results = {"total_comments": len(comments), "hatespeech": 0, "offensive": 0, "racist": 0, "sexist": 0}

#     for comment in comments:
#         # Racism prediction
#         if predict_category(comment, racism_model) == 1:
#             results["racist"] += 1
#         # Hate speech prediction
#         hatespeech_category = predict_category(comment, hatespeech_model)
#         if hatespeech_category == 0:
#             results["offensive"] += 1
#         elif hatespeech_category == 1:
#             results["hatespeech"] += 1
#         # Sexism prediction
#         if predict_category(comment, sexism_model) == 1:
#             results["sexist"] += 1

#     return results

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware
# import torch
# from transformers import BertForSequenceClassification, BertTokenizer

# app = FastAPI()

# # CORS middleware setup for cross-origin requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8000", "http://192.168.0.105:8000"],  # Add other origins as needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Input data model for a list of comments
# class InputData(BaseModel):
#     comments: List[str]

# # Define your model paths
# racism_model_path = 'C:\\Users\\HP\\Downloads\\bert_racism_model'
# hatespeech_model_path = 'C:\\Users\\HP\\Downloads\\bert_hatespeech_model_state_dict.pth'
# sexism_model_path = 'C:\\Users\\HP\\Downloads\\bert_sexism_model'

# # Initialize the tokenizer
# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# # Specify the computing device
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # Load the Racism Model
# racism_model = BertForSequenceClassification.from_pretrained(racism_model_path, num_labels=2)
# racism_model = racism_model.to(device)

# Load the Hate Speech Model
# hatespeech_model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
# hatespeech_model.load_state_dict(torch.load(hatespeech_model_path, map_location=device))
# hatespeech_model = hatespeech_model.to(device)

# Load the Sexism Model
# sexism_model = BertForSequenceClassification.from_pretrained(sexism_model_path, num_labels=2)
# sexism_model = sexism_model.to(device)

# # Prediction function
# def predict_category(comment: str, model) -> int:
#     encoded_comment = tokenizer.encode_plus(
#         comment,
#         add_special_tokens=True,
#         max_length=256,
#         return_tensors='pt',
#         padding='max_length',
#         truncation=True,
#     )
#     encoded_comment = {k: v.to(device) for k, v in encoded_comment.items()}
#     with torch.no_grad():
#         outputs = model(**encoded_comment)
#     predicted_class = torch.argmax(outputs.logits, dim=1).item()
#     return predicted_class

# @app.get("/")
# def read_root():
#     return {"message": "Service is running"}

# @app.post("/predict/racism/")
# async def predict_racism(data: InputData):
#     total_comments = len(data.comments)
#     racist_comments = sum(predict_category(comment, racism_model) == 1 for comment in data.comments)
#     return {
#         "Total Comments": total_comments,
#         "Racist Comments": racist_comments,
#         "Non-Racist Comments": total_comments - racist_comments,
#     }


# # @app.post("/predict/hatespeech/")
# # async def predict_hatespeech(data: InputData):
# #     total_comments = len(data.comments)
# #     print("Hello how you doing")
# #     results = {
# #         "Total Comments": total_comments, 
# #         "Offensive Comments": 0, 
# #         "Hate Speech Comments": 0, 
# #         "Neither": 0    
# #     }
    
# #     for comment in data.comments:
# #         prediction = predict_category(comment, hatespeech_model)
# #         if prediction == 1:
# #             results["Hate Speech Comments"] += 1
# #         elif prediction == 2:
# #             results["Offensive Comments"] += 1
# #         else:
# #             results["Neither"] += 1
    
# #     return results


# @app.post("/predict/sexism/")
# async def predict_sexism(data: InputData):
#     total_comments = len(data.comments)
#     sexist_comments = sum(predict_category(comment, sexism_model) == 1 for comment in data.comments)
#     return {
#         "Total Comments": total_comments,
#         "Sexist Comments": sexist_comments,
#         "Non-Sexist Comments": total_comments - sexist_comments,
#     }


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import BertForSequenceClassification, BertTokenizer

app = FastAPI()

# CORS middleware setup for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://192.168.0.105:8000"],  # Add other origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data model for a list of comments
class InputData(BaseModel):
    comments: List[str]

 

# Define your model paths
racism_model_path = 'C:\\Users\\HP\\Downloads\\bert_racism_model'
hatespeech_model_path = 'C:\\Users\\HP\\Downloads\\bert_hatespeech_model_state_dict.pth' # Path for hate speech model
sexism_model_path = 'C:\\Users\\HP\\Downloads\\bert_sexism_model'

# Initialize the tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Specify the computing device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the Racism Model
racism_model = BertForSequenceClassification.from_pretrained(racism_model_path, num_labels=2)
racism_model = racism_model.to(device)

# Load the Hate Speech Model
hatespeech_model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)
hatespeech_model.load_state_dict(torch.load(hatespeech_model_path, map_location=device))
hatespeech_model = hatespeech_model.to(device)

# Load the Sexism Model
sexism_model = BertForSequenceClassification.from_pretrained(sexism_model_path, num_labels=2)
sexism_model = sexism_model.to(device)

# Prediction function, now parameterized to allow different models
def predict_category(comment: str, model) -> int:
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
    return predicted_class

@app.get("/")
def read_root():
    return {"message": "Service is running"}

@app.post("/predict/racism/")
async def predict_racism(data: InputData):
    total_comments = len(data.comments)
    racist_comments = sum(predict_category(comment, racism_model) == 1 for comment in data.comments)
    return {
        "Total Comments": total_comments,
        "Racist Comments": racist_comments,
        "Non-Racist Comments": total_comments - racist_comments,
    }

@app.post("/predict/sexism/")
async def predict_sexism(data: InputData):
    total_comments = len(data.comments)
    sexist_comments = sum(predict_category(comment, sexism_model) == 1 for comment in data.comments)
    return {
        "Total Comments": total_comments,
        "Sexist Comments": sexist_comments,
        "Non-Sexist Comments": total_comments - sexist_comments,
    }

@app.post("/predict/hatespeech")
async def classify_comments(data: InputData):
    results = {"Hate Speech Comments": 0, "Offensive Comments": 0, "Neither": 0}
    for comments in data.comments:
        predicted_class = predict_category(comments, hatespeech_model)
        if predicted_class == 0:
            results["Hate Speech Comments"] += 1
        elif predicted_class == 1:
            results["Offensive Comments"] += 1
        elif predicted_class == 2:
            results["Neither"] += 1
    return results
