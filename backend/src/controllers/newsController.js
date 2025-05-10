export const getNews = async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://newsapi.org/v2/everything?q="guerra economica" OR "dazi" OR "conflitto economico"&language=it&sortBy=popularity&apiKey=${apiKey}`;        
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Error while fetching news"});
        console.error(error);
    }
}
