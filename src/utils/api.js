const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
      "content-type": "application/json",
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlYTA3MDNhYTI4NTAzNGY3OGFiM2QiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2NTgzMTE1LCJleHAiOjE3MDgxMTkxMTV9.vkod0JF-K99SI2M3MS3A4WoKWKfwRKVNUj-2yg0-PeI',
    },
  };

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
}


class Api {
    constructor ({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    getProductList(page=3) {
        return fetch (`${this._baseUrl}/products?page=${page}`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }
    getProductById(id) {
        return fetch (`${this._baseUrl}/products/${id}`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }
    addProduct() {
        return fetch (`${this._baseUrl}/products`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                "name": "Сарафан для собачки",
                "price": 7000,
                "discount": 5,
                "wight": "700 г",
                "description": "Шелковый сарафан-парео с декоративным ошейником",
                "available": true,
                "stock": 1,
                "pictures": "https://glamdog.ru/15736-large_default/1000-dvs-plate-baia.jpg" 
            }),
        }).then((res) => onResponse(res));
    }
    deleteProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`,{
          headers: this._headers,
          method: 'DELETE'
        }).then(onResponse); 
      }
    setUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: "Анастасия",
                about: "Фронтенд-разработчик"
            }),
        }).then((res) => onResponse(res));
    }
    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }
    searchProducts(query) {
        return fetch (`${this._baseUrl}/products/search?query=${query}`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }
    // like - true / false
    changeLikeProductStatus(productId, like) {
        return fetch (`${this._baseUrl}/products/likes/${productId}`, {
            headers: this._headers,
            method: like ? "PUT" : "DELETE"
        }).then((res) => onResponse(res));
    }
    deleteLike(productId) {
        return fetch (`${this._baseUrl}/products/likes/${productId}`, {
            headers: this._headers,
            method: "DELETE"
        }).then((res) => onResponse(res));
    }
    addLike(productId) {
        return fetch (`${this._baseUrl}/products/likes/${productId}`, {
            headers: this._headers,
            method: "PUT"
        }).then((res) => onResponse(res));
    }

}

export const api = new Api(config);

// api.getProductList();