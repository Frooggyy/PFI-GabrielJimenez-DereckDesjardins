
class Users_API {
    static API_URL() { return "http://localhost:5000/" };
    static initHttpState() {
        this.currentHttpError = "";
        this.currentStatus = 0;
        this.error = false;
    }
    static setHttpErrorState(xhr) {
        if (xhr.responseJSON)
            this.currentHttpError = xhr.responseJSON.error_description;
        else
            this.currentHttpError = xhr.statusText == 'error' ? "Service introuvable" : xhr.statusText;
        this.currentStatus = xhr.status;
        this.error = true;
    }
    static async HEAD() {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL(),
                type: 'HEAD',
                contentType: 'text/plain',
                complete: data => { resolve(data.getResponseHeader('ETag')); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Get(data) {
        Users_API.initHttpState();
        console.log(data);
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL()+`api/accounts?email=${data.Email}`,
                type: "GET",
                contentType: 'application/json',
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async GetQuery(queryString = "") {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + queryString,
                complete: data => {
                    resolve({ ETag: data.getResponseHeader('ETag'), data: data.responseJSON });
                },
                error: (xhr) => {
                    Users_API.setHttpErrorState(xhr); resolve(null);
                }
            });
        });
    }
    static async Login(data){
        return new Promise(resolve=>{
            $.ajax({
                url : this.API_URL()+`token`,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: (data)=>{resolve(data);},
                error: (xhr)=>{Users_API.setHttpErrorState(xhr); resolve(null);}
            });
        });
    }
    static async Verify(data){
        return new Promise(resolve=>{
            $.ajax({
                url : this.API_URL()+`accounts/verify?id=${data.Id}&code=${data.code}`,
                type: "GET",
                contentType: "application/json",
                success: (data)=>{resolve(data);},
                error: (xhr)=>{Users_API.setHttpErrorState(xhr); resolve(null);}
            });
        });
    }
    static async Logout(userId){
        sessionStorage.removeItem("activeUser");
        sessionStorage.removeItem("activeToken");
        
        return new Promise(resolve=>{
            $.ajax({
                url : this.API_URL()+`accounts/logout?userId=${userId}`,
                type: "GET",
                success: (data)=>{resolve(data);},
                error: (xhr)=>{Users_API.setHttpErrorState(xhr); resolve(null);}
            });
        });
    }
    static async Save(data, create = true) {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url: create ? this.API_URL()+`accounts/register`: this.API_URL() + `accounts/modify`,
                type: create ? "POST" : "PUT",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Delete(id) {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + "/" + id,
                type: "DELETE",
                complete: () => {
                    Users_API.initHttpState();
                    resolve(true);
                },
                error: (xhr) => {
                    Users_API.setHttpErrorState(xhr); resolve(null);
                }
            });
        });
    }
}