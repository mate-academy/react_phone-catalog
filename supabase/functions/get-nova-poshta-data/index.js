const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const NOVAPOSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';
Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }
    try {
        if (req.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json',
                },
            });
        }
        const apiKey = Deno.env.get('NOVAPOSHTA_API_KEY');
        if (!apiKey) {
            throw new Error('NOVAPOSHTA_API_KEY is not set');
        }
        const { method, properties } = (await req.json());
        if (!method) {
            return new Response(JSON.stringify({ error: 'Method is required' }), {
                status: 400,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json',
                },
            });
        }
        // 🔥 ВАЖЛИВО: правильна модель для кожного методу
        const modelMap = {
            getCities: 'Address',
            getWarehouses: 'Address',
            getDocumentPrice: 'InternetDocument',
        };
        const modelName = modelMap[method];
        if (!modelName) {
            return new Response(JSON.stringify({ error: 'Unknown method' }), {
                status: 400,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json',
                },
            });
        }
        const response = await fetch(NOVAPOSHTA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apiKey,
                modelName,
                calledMethod: method,
                methodProperties: properties || {},
            }),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });
    }
});
export {};
