// Netlify Serverless Function for password validation
// This keeps passwords hidden from browser DevTools

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { password, level } = JSON.parse(event.body);

        // Correct passwords for each level
        const correctPasswords = {
            1: 'WAKEUP',
            2: 'NEVERENDINGSTORY',
            3: '011',
            4: 'E',
            5: 'STABILIZE',
            6: 'NOUTURN',
            7: 'CRITICALSITUATION'
        };

        const correct = correctPasswords[level];
        
        // Case-insensitive comparison and trim whitespace
        const isCorrect = correct && password.toUpperCase().trim() === correct;

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                isCorrect: isCorrect
            })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request' })
        };
    }
};
