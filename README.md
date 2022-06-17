# aws-s3-file-upload

* **ENV**

  - SECRET_KEY (for simple auth)
  - WHITELIST (lists whitelist cors)
  - AWS_BUCKET_NAME (aws bucket name)
  - AWS_SECRET_KEY (aws Secret access key)
  - AWS_ACCESS_KEY_ID (aws Access key ID)
  - AWS_REGION (aws bucket region code)

---

* **URL**

    /v1/upload

* **Method:**

    `POST`
  
*  **URL Params**

    None
    
*  **Headers**

    `Authorization=[SECRET_KEY]`

* **Data**

    **Required:**
 
    `img=[formdata]`
    
    **Optional:**
    
    `path=[string]` (key for bucket object)


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        location: [string],
        name: [string]
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    **Content:**
    ```js
    {
      message: "File Already Exist!"
    }
    ```

    OR

    * **Code:** 401 Forbidden <br />
    **Content:**
    ```js
    {
      message: "You're Unauthorized!"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```js
    {
      message: "Internal Server Error"
    }
    ```
    
    ---

* **URL**

    /v1/lists

* **Method:**

    `GET`
  
*  **URL Params**

    None
    
*  **Headers**

    `Authorization=[SECRET_KEY]`

* **Data**
    
    **Optional:**
    
    `path=[string]` (key for bucket object)


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        data: [array]
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Forbidden <br />
    **Content:**
    ```js
    {
      message: "You're Unauthorized!"
    }
    ```

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```js
    {
      message: "Internal Server Error"
    }
    ```
