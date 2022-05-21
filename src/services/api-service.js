export default class APIService {
  _apiKey = process.env.REACT_APP_API_KEY;
  _apiBase = 'https://api.openai.com/v1/engines';

  // _engine = '/text-curie-001/completions'

  formData = (prompt) => {
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0  
    };

    return data;
  }

  getData = async (engine, data) => {
    const res = await fetch(`${this._apiBase}/${engine}/completions`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._apiKey}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  };
}