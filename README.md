# Pet clinic

### Notes:
- ```React``` + ```bootstrap```  
- ```React.Context``` + ```React.Provider``` + ```Fetch```
- Backend and frontend separate apps
- Token authentication only checked when logging in
- Token stored in localstorage


### Improvement ideas:
- using signals or optimizing rendering with usememo
- Making backend https
- token refresh + timeout
- 

### Authentication information:
| Email address  | Password | token |
| ------------- | ------------- | ------------- |
| doctor@pets.com  | Pet1234  | <details><summary>Click to expand</summary>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng</details> |
| owner1@test.com  | qwerty  | <details><summary>Click to expand</summary>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.QAtAc6Imr2-NDhRpPcobJfjA20vh_bDk3wMhL_-46Fw</details> |
| owner2@woof.net  | Bark!  | <details><summary>Click to expand</summary>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.DA59WWIUeZ-4v4XVyrbXqd9z1I-YlZRCz45oCuyU2T0</details> |
| owner3@abc.org  | _Dog2023  | <details><summary>Click to expand</summary>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Iiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.zqF-TVZor-FIGK_o3_5exzGJy1MuwkscYLjyS9pawVM</details> |

### User stories:
- ```As a doctor, I need to list all pets registered in our system so I can find the pet I am looking for. I should be able to filter based on status "alive"```  
  
- ```As a doctor, I need to see details info about the pet, and also edit that information```  
  
- ```As an owner, I expect to be able to add a new pet to the client registry```  
  
- ```There should be a visit system for doctors and owners. Also there should be "doctors only" comment that only the doctor can see```

- ```Logging in as doctor or pet owner.```
