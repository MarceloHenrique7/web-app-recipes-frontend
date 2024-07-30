import { fetchUtils, DataProvider, CreateParams, UpdateParams } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const httpClient = async (url: string, options: fetchUtils.Options = {}): Promise<any> => {



    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers);
    }
    /*
    O httpClient é uma função personalizada que adiciona um cabeçalho de autorização com um token JWT para todas as requisições feitas para a API. Ele também garante que o cabeçalho Accept esteja presente e que 
    */

    options.headers.set('Authorization', `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNiQVhOaEpTWWNjbmdDVUxDNEI4MCJ9.eyJpc3MiOiJodHRwczovL2Rldi1teXV2d2dwdG8za25lcTJ6LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzcyNjQzMTE4NDI3MjI2NzQ2NSIsImF1ZCI6WyJ3ZWItYXBwLXJlY2lwZXMtYXBpIiwiaHR0cHM6Ly9kZXYtbXl1dndncHRvM2tuZXEyei51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIyMjY4NDgyLCJleHAiOjE3MjIzNTQ4ODIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJZaTJGQmdlNXdRd20zOXBHN0FRbUFZb1VEQnNKOVdWWCJ9.LB1kv9rsXFAEsUCWC-3XE4HToU-CIlWvduU83U862Cw_M7Jikq-DkWjIxhEOqxPj_ZIAH6VLT_3XagvyuA6VjQyJ5vFB6HyB1ey_PNKabustz8RhhZUCgAKAt5BDVJKKm4EhZhjZvYmDqmIPQoIHbFa9WvbpmNBnqwcjc4bo5vgjAg4VGMOuFu5QJa0_eWIJDD4Not1tx7yhLQKSbPcv_V6Ut7kN5-pGKJePa8RoI00fAMapGqeIPuo1mf0osizjhHzk2f2j8fNV1H37FDZJUcOhsU5VG5Q2LkDIiMPmJ3fQZm4Oct3RNmTF66RNGXgMjJp7N-J3OcEvOKlbuCbqfQ`);
    return fetchUtils.fetchJson(url, options);

    /*
    fetchUtils.fetchJson(url, options): Realiza a requisição HTTP e retorna uma promessa que resolve com a resposta da API.
    */
};

const convertFileToBase64 = (file: { rawFile: File }): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
        /*
        convertFileToBase64: Converte um arquivo para uma string Base64.
        file: Objeto que deve ter uma propriedade rawFile do tipo File.
        FileReader: API do navegador para ler arquivos. Usa o método readAsDataURL para ler o arquivo e converter seu conteúdo para uma string Base64.
        reader.onload: Quando a leitura é concluída com sucesso, resolve a promessa com o resultado como uma string.
        reader.onerror: Se ocorrer um erro durante a leitura, a promessa é rejeitada.
        */
    });

const dataProvider = simpleRestProvider(`${API_BASE_URL}/admin/api`, httpClient);

const uploadImage = async (params: CreateParams<any> | UpdateParams<any>) => {
    if (params.data.imageFile && params.data.imageFile.rawFile instanceof File) {
        const base64Image = await convertFileToBase64(params.data.imageFile);
        params.data.imageFile = base64Image;
    }
    return params;
    /*
        uploadImage: Prepara os dados para serem enviados para a API.
        params: Parâmetros da requisição, que podem ser para criação ou atualização de um recurso.
        params.data.imageFile: Se há um arquivo de imagem e ele é do tipo File, a função converte esse arquivo para Base64.
        params.data.imageFile = base64Image: Atualiza os parâmetros com a imagem codificada em Base64.
        return params: Retorna os parâmetros atualizados para que possam ser enviados ao dataProvider.
     */
};

const enhancedDataProvider: DataProvider = {
    ...dataProvider,
    create: (resource: string, params: CreateParams<any>) => {
        return uploadImage(params).then((updatedParams) =>
            dataProvider.create(resource, updatedParams as CreateParams<any>)
        );
    },
    update: (resource: string, params: UpdateParams<any>) => {
        return uploadImage(params).then((updatedParams) =>
            dataProvider.update(resource, updatedParams as UpdateParams<any>)
        );
    },
    delete: dataProvider.delete,
    deleteMany: dataProvider.deleteMany,
    getList: dataProvider.getList,
    getMany: dataProvider.getMany,
    getManyReference: dataProvider.getManyReference,
    getOne: dataProvider.getOne,
    updateMany: dataProvider.updateMany,
    /*
        enhancedDataProvider: Extende o dataProvider básico com funcionalidades adicionais.
        create e update: Substituem os métodos padrão de criação e atualização para processar imagens antes de enviar os dados.
        uploadImage(params): Chama a função uploadImage para converter imagens para Base64.
        dataProvider.create(resource, updatedParams): Usa o dataProvider básico para criar um novo recurso com os parâmetros atualizados.
        dataProvider.update(resource, updatedParams): Usa o dataProvider básico para atualizar um recurso com os parâmetros atualizados.
        Métodos de CRUD padrão: Os métodos delete, deleteMany, getList, getMany, getManyReference, getOne, e updateMany são usados diretamente do dataProvider básico.
    
    */
};

export default enhancedDataProvider;
