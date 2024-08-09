import pandas as pd
from datasets import Dataset

# Load your original CSV file
df = pd.read_csv('sample_syn.csv')

# Function to format data
def format_for_chat(row):
    return {
        'text': f"User: [COMMAND]{row['user_input']}\nMachine:{row['machine_command']}", 
    
    }

# Convert DataFrame to Dataset
dataset = Dataset.from_pandas(df)

# Apply formatting
formatted_dataset = dataset.map(format_for_chat, remove_columns=['user_input', 'machine_command'])

# Convert formatted dataset to DataFrame
formatted_df = formatted_dataset.to_pandas()

# Save the DataFrame to a CSV file
formatted_df.to_csv('formatted_dataset.csv', index=False)
