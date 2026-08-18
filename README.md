## run the project (both fron and back)

npm run dev

## info 
```
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
```

## Zod --- form validation ---
- **step 1** : 
create form schema : 
```export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
```
- **step 2** : 
build custom hook to initialize zod on the form : 
```export const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {email: ""},
  });
};
```
- **step 3** :
-call to custom hook on the form page:
```
const {register, handleSubmit, formState: { errors, isSubmitting },} = useLoginForm();
```
-use handleSubmit to execute validation before calling the api
```
<form  onSubmit={handleSubmit(HandleLogin)}>
```
-use register to update and handle value validation (no need to use onClick and {value}) :
```
<input type="email"
// value={email}
// onChange={(e) => setEmail(e.target.value)}
{...register("email")}/>
```

- **step 4** :
show error :
```
 {errors.email && ({errors.email.message})}
 ```

