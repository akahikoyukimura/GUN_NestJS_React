## run the project (both fron and back)

npm run dev

## info 
Request
   ↓
Middleware      → "Do something before Nest handles the request"
   ↓
Guard           → "Am I allowed to access this route?"
   ↓
Interceptor     → "Do something before/after the controller"
   ↓
Pipe            → "Is/transform this input valid?"
   ↓
Controller
   ↓
Interceptor      → "Process the response"
   ↓
Response