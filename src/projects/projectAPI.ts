import {Project} from './Project';
const baseUrl = 'https://localhost:4000';
const url = '${baseUrl}/projects';

function translateStatusToErrorMessage(status: number){
    switch(status){
        case 401:
            return 'Please login again';
        case 403: 
            return 'You do not have permission to view the project(s).';
            default:
                return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any){
    if(response.ok){
        return response;
    }else{
        const httpErrorInfo ={
            status: response.status,
            statusText:response.statusText,
            url: response.url,
        };
        console.log('log server http error: ${JSON.stringify(httpErrorInfo)}');

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
}

function delay(ms: number){
    return function (x: any): Promise<any> {
        return new Promise ((resolve) => setTimeout(() => resolve(x), ms));
    };

}

function convertToProjectModel(item:any): Project {
    return new Project(item);
}

const projectAPI ={
    get(page =1, limit = 20){
        return fetch('${url}?_page=${page}&_limi=${limit}&_sort=name')
        .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModel)
        .catch((error:TypeError)=> {
            throw new Error(
                'There was an error retrieving the projects. Please try again.'
            );
        });
    },
};

export {projectAPI};