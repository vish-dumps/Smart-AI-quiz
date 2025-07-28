export async function generateQuiz(topic, amount = 5) {
  try {
    const response = await fetch("http://localhost:5000/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic, amount })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend response error:", errorText);
      throw new Error("Failed to fetch quiz");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Quiz format invalid: expected an array");
    }

    return data; // array of { question, options, answer }
  } catch (error) {
    console.error("❌ generateQuiz.js error:", error);
    throw error;
  }
}
