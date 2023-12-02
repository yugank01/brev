const axios = require('axios');
const text=require("../demotext")

// get_Scrapping
function create_scrapping(req,res){
    const options = {
        method: 'POST',
        url: 'https://web2meaning.p.rapidapi.com/parse/v2',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.XRAPIDKEY,
          'X-RapidAPI-Host': 'web2meaning.p.rapidapi.com'
        },
        data: {
          url: 'https://www.manipalhospitals.com/',
          params: {
            domain: true,
            html: false,
            links: false,
            media: {
              audios: false,
              images: true,
              videos: true
            },
            metadata: {
              author: true,
              contentType: true,
              date: {
                publishedTime: true,
                updateTime: true
              },
              description: true,
              favicon: true,
              keywords: true,
              title: true
            },
            nlp: {
              customCategories: [
                'business',
                'entertainment',
                'other',
                'politics',
                'sci.chemistry',
                'sci.computer_science',
                'sci.economics',
                'sci.engineering',
                'sci.geo_science',
                'sci.life_sciences',
                'sci.mathematics',
                'sci.physics',
                'sci.social_science',
                'sports',
                'technology'
              ],
              entities: true,
              isArticle: true,
              isCorporative: false,
              websiteTopic: false
            },
            request: {jsRendering: false},
            text: {
              body: true,
              cleanBody: false,
              fullText: true,
              includeLinks: false,
              lang: true
            }
          }
        }
    };
    async function fetchData() {
        try {
          const response = await axios.request(options);
          console.log(response?.data)
          res.json(response?.data)
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()  
    
}

// get_Summary
function create_summary(req,res){
    const encodedParams = new URLSearchParams();
    // Text from create scrapping
encodedParams.set('text', text.text);
encodedParams.set('percentage', '70');
    const options = {
      method: 'POST',
      url: 'https://text-summarize-pro.p.rapidapi.com/summarizeFromText',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.XRAPIDKEY,
        'X-RapidAPI-Host': 'text-summarize-pro.p.rapidapi.com'
      },
      data: encodedParams,
    };
    async function fetchData() {
        try {
          const response = await axios.request(options);
          console.log(response?.data)
          res.json(response?.data)
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()  
    
}


// get_sentiment
function create_sentiment(req,res){
    const options = {
        method: 'POST',
        url: 'https://microsoft-text-analytics1.p.rapidapi.com/sentiment',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.XRAPIDKEY,
          'X-RapidAPI-Host': 'microsoft-text-analytics1.p.rapidapi.com'
        },
        data: {
          documents: [
            {
              id: '1',
              language: 'en',
              text: text.summary.slice(5100)
            }
          ]
        }
      };

    async function fetchData() {
        try {
          const response = await axios.request(options);
          console.log(response?.data)
          res.json(response?.data)
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()  
    
}


// get_Competitors
function create_competitors(req,res){
    const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: 'Hotels in San Francisco, USA',
          limit: '20',
          lat: '37.359428',
          lng: '-121.925337',
          zoom: '13',
          language: 'en',
          region: 'us'
        },
        headers: {
          'X-RapidAPI-Key': process.env.XRAPIDKEY,
          'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
      };
    async function fetchData() {
        try {
          const response = await axios.request(options);
        //   this is working
          console.log(response?.data)
          res.json(response?.data);
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()   
}


// get_Entities
function create_entities(req,res){
    const options = {
        method: 'POST',
        url: 'https://microsoft-text-analytics1.p.rapidapi.com/entities/recognition/general',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.XRAPIDKEY,
          'X-RapidAPI-Host': 'microsoft-text-analytics1.p.rapidapi.com'
        },
        data: {
          documents: [
            {
              id: '1',
              language: 'en',
              text: text.summary.slice(5119)
            }
          ]
        }
      };
    async function fetchData() {
        try {
          const response = await axios.request(options);
        //   this is working
          console.log(response?.data.documents[0].entities.forEach((item)=>{
            item
          }))
        //   res.json(response?.data.documents[0].entities.forEach(entity => {
        //     const text = entity?.text;
        //     console.log(text);
        //   }));
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()  
    
}

// get_phrases
function create_phrases(req,res){
    const options = {
        method: 'POST',
        url: 'https://microsoft-text-analytics1.p.rapidapi.com/entities/recognition/general',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.XRAPIDKEY,
          'X-RapidAPI-Host': 'microsoft-text-analytics1.p.rapidapi.com'
        },
        data: {
          documents: [
            {
              id: '1',
              language: 'en',
              text:text.summary.slice(5100)
            }
          ]
        }
      };
    async function fetchData() {
        try {
          const response = await axios.request(options);
          console.log(response?.data);
          res.json(response?.data);
        } catch (error) {
          console.error(error);
        }
      }
    fetchData()  
    
}




module.exports={
    create_scrapping,
    create_summary,
    create_entities,
    create_phrases,
    create_sentiment,
    create_competitors

}