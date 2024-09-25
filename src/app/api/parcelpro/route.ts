export const POST = async (request: Request) => {
    try{
        const response = await request.json();
        console.log(response);
        return{
            success: true
        }
    } catch (err){
        return new Response("failed to fetch auth", {status: 500});
    }
}