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
        image: imageUrl,
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
    const token = data.user.token

    // 나중에 api 쓸 때 권한 받을 수 있음
    localStorage.setItem('token', token)

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

const product = async (inputName, inputPrice) => {
  const token = localStorage.getItem('token')
  const response = await fetch(url + "/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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
  document.querySelector(".price").innerHTML = "price : " + data.product.price;
  document.querySelector(".name").innerHTML = "name : " + data.product.itemName;
};
product();

const $img = document.querySelector('img')
const imageInput = document.querySelector("#profileImg");
const imageUrl = $img.src
const handleImageInput = async (e) => {
  const formData = new FormData();
  const imageFile = e.target.files[0];
  console.log(e.target.files);
  formData.append("image", imageFile);
  const response = await fetch(url + "/image/uploadfile", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  $img.src = url +'/'+ data.filename
  console.log(data);
};
imageInput.addEventListener("change", handleImageInput);
