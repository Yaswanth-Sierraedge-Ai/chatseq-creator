
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import json
from pathlib import Path

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model definitions
class SequenceBase(BaseModel):
    title: str
    content: str

class SequenceCreate(SequenceBase):
    pass

class Sequence(SequenceBase):
    id: str
    createdAt: str

    class Config:
        orm_mode = True

# In-memory storage (replace with database in production)
DATA_FILE = Path("data/sequences.json")

# Ensure data directory exists
Path("data").mkdir(exist_ok=True)

# Initialize data file if it doesn't exist
if not DATA_FILE.exists():
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

def load_sequences():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_sequences(sequences):
    with open(DATA_FILE, "w") as f:
        json.dump(sequences, f, indent=2)

@app.get("/")
def read_root():
    return {"message": "Test Sequence Generator API"}

@app.get("/api/sequences", response_model=List[Sequence])
def get_sequences():
    return load_sequences()

@app.get("/api/sequences/{sequence_id}", response_model=Sequence)
def get_sequence(sequence_id: str):
    sequences = load_sequences()
    for sequence in sequences:
        if sequence["id"] == sequence_id:
            return sequence
    raise HTTPException(status_code=404, detail="Sequence not found")

@app.post("/api/sequences", response_model=Sequence)
def create_sequence(sequence: SequenceCreate):
    sequences = load_sequences()
    new_sequence = {
        "id": str(uuid.uuid4()),
        "title": sequence.title,
        "content": sequence.content,
        "createdAt": datetime.now().isoformat()
    }
    sequences.append(new_sequence)
    save_sequences(sequences)
    return new_sequence

@app.put("/api/sequences/{sequence_id}", response_model=Sequence)
def update_sequence(sequence_id: str, sequence_update: SequenceBase):
    sequences = load_sequences()
    for i, sequence in enumerate(sequences):
        if sequence["id"] == sequence_id:
            sequences[i]["title"] = sequence_update.title
            sequences[i]["content"] = sequence_update.content
            save_sequences(sequences)
            return sequences[i]
    raise HTTPException(status_code=404, detail="Sequence not found")

@app.delete("/api/sequences/{sequence_id}")
def delete_sequence(sequence_id: str):
    sequences = load_sequences()
    for i, sequence in enumerate(sequences):
        if sequence["id"] == sequence_id:
            del sequences[i]
            save_sequences(sequences)
            return {"message": "Sequence deleted"}
    raise HTTPException(status_code=404, detail="Sequence not found")

@app.post("/api/generate")
def generate_sequence(prompt_data: dict):
    prompt = prompt_data.get("prompt", "")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    
    # Generate test sequence
    lines = [
        f"// Test Sequence for: {prompt}",
        f"// Generated on: {datetime.now().isoformat()}",
        '',
        'describe("Test Suite", () => {',
        '  beforeEach(() => {',
        '    // Setup code',
        '    console.log("Setting up test environment");',
        '  });',
        '',
        '  it("should validate the main functionality", () => {',
        '    // Arrange',
        '    const testData = {',
        f'      input: "{prompt.replace(chr(34), chr(92) + chr(34))}",',
        '      expectedOutput: "success"',
        '    };',
        '',
        '    // Act',
        '    const result = processInput(testData.input);',
        '',
        '    // Assert',
        '    expect(result).toEqual(testData.expectedOutput);',
        '  });',
        '',
        '  it("should handle edge cases", () => {',
        '    // Additional test logic here',
        '    expect(true).toBeTruthy();',
        '  });',
        '',
        '  afterEach(() => {',
        '    // Cleanup code',
        '    console.log("Cleaning up after test");',
        '  });',
        '});',
    ]
    
    return {"generatedContent": "\n".join(lines)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
