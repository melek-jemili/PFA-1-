import openai 
openai.api_key =  "The API key copied from OpenAI platforme"
def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful touristique assistant."},
            {"role": "user", "content": prompt},
        ]    
    )
    response = response.choices[0].message.content.strip()

if __name__ == '__main__':
    while True:
        user_input = input("Vous: ")
        if user_input.lower() in ["quit", "exit", "Au revoir", "bye"]:
            print("TravelPal: Bye!")
            break
            
        response = chat_with_gpt(user_input)
        print("TravelPal:", response)


        
