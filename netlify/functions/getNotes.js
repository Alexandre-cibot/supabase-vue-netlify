require('dotenv').config()
const {
  SUPABASE_URL,
  SUPABASE_KEY,
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Our standard serverless handler function
exports.handler = async () => {

    const { data, error } = await supabase
        .from('Notes')
        .select('*')
    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
}