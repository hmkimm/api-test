let url = "https://api.mandarin.weniv.co.kr";

const $btn = document.querySelector("button");
const register = async () => {
  const response = await fetch(url + "/user", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      user: {
        username: "hm",
        email: "hm@weniv.co.kr",
        password: "123456",
        accountname: "hmaccount",
        intro: "hmintro",
        image: "https://api.mandarin.weniv.co.kr/1641906557953.png",
      },
    }),
  });
  let data = await response.json();
};

const logIn = async () => {
  try {
    const response = await fetch(url + "/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: "hm@weniv.co.kr",
          password: "123456",
        },
      }),
    });
    const data = await response.json();
    console.log("토큰", data.user.token);
    return data.user.token;
  } catch (err) {
    console.error(err);
  }
};
logIn();

$btn.addEventListener("click", async () => {
  const inputName = document.querySelector("#product-name").value;
  const inputPrice = parseInt(document.querySelector("#product-price").value);
  let token = await logIn();
  product(inputName, inputPrice, token);
});

const product = async (inputName, inputPrice, token) => {

  const response = await fetch(url + "/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2MzOGFiYjJjYjIwNTY2MzJkNDc2ZSIsImV4cCI6MTY5MTA4MDQ2MiwiaWF0IjoxNjg1ODk2NDYyfQ.BXMTAeBiuRXiZrqCeyoTTVbCf3Qb7HU4OVfnBPyp-zM'}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      product: {
        itemName: inputName,
        price: inputPrice, //1원 이상
        link: "https://api.mandarin.weniv.co.kr/1641906557953.png",
        itemImage: "https://api.mandarin.weniv.co.kr/1641906557953.png",
      },
    }),
  });

  let data = await response.json();
  console.log(data);
  // console.log(data.product.itemName);
  document.querySelector(".price").innerHTML = "price : " + data.product.link;
  document.querySelector(".name").innerHTML = "name : " + data.product.itemName;
};
product();
