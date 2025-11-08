let addBtn = document.querySelectorAll("#add");
let genBill = document.querySelector("#bill");
let bill = document.querySelector(".bill");
let rows = document.querySelectorAll("tr");
let form = document.querySelector("form");
let notify = document.querySelector(".notificator");

let totalAmt = 0;
let price = {
    kafuli: 120,
    phanu: 130,
    chainsoo: 140,
    aloo: 110,
    jhangore: 125,
    mandua: 100,
    bhaang: 80,
    dubuk: 130,
    gahat: 120,
    chapati: 30,
    rice: 80,
    balmithai: 100,
    singori: 90,
    jhangora: 110,
    arsa: 100
};

let qty = {
    kafuli: 0,
    phanu: 0,
    chainsoo: 0,
    aloo: 0,
    jhangore: 0,
    mandua: 0,
    bhaang: 0,
    dubuk: 0,
    gahat: 0,
    chapati: 0,
    rice: 0,
    balmithai: 0,
    singori: 0,
    jhangora: 0,
    arsa: 0
};

let rmap = {
    kafuli: "r1",
    phanu: "r2",
    chainsoo: "r3",
    aloo: "r4",
    jhangore: "r5",
    mandua: "r6",
    bhaang: "r7",
    dubuk: "r8",
    gahat: "r9",
    chapati: "r10",
    rice: "r11",
    balmithai: "r12",
    singori: "r13",
    jhangora: "r14",
    arsa: "r15"
};


function addDish() {
    totalAmt += price[this.getAttribute("class")];
    qty[this.getAttribute("class")] += 1;
    console.log(`your order reached amount ${totalAmt}`);
    notify.innerText = "Added Item to your thali";
    notify.classList.remove("hide");
    setTimeout(() => {
        notify.classList.add("hide");
    },2000);
    if(qty[this.getAttribute("class")] === 1){
        let remove = document.createElement("button");
        remove.classList.add(this.getAttribute("class"));
        remove.setAttribute("id", "add");
        remove.innerText = "Remove Item";
        remove.addEventListener("click", removeDish);
        let p = document.createElement("p");
        p.classList.add(this.getAttribute("class"));
        this.after(p);
        this.after(remove);
    }
    document.querySelector(`p.${this.getAttribute("class")}`).innerText = `You have added ${qty[this.getAttribute("class")]} items in your cart`;
}

function removeDish(){
    totalAmt -= price[this.getAttribute("class")];
    console.log(`removed ${price[this.getAttribute("class")]}`);
    qty[this.getAttribute("class")] -= 1;
    console.log(qty[this.getAttribute("class")]);
    notify.innerText = "Removed Item from your thali";
    notify.classList.remove("hide");
    setTimeout(() => {
        notify.classList.add("hide");
    },2000);
    document.querySelector(`p.${this.getAttribute("class")}`).innerText = `You have added ${qty[this.getAttribute("class")]} items in your cart`;
    if(qty[this.getAttribute("class")] === 0){
        this.remove();
        let p = document.querySelector(`p.${this.getAttribute("class")}`);
        p.remove();
    }
}

for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addDish);
}

genBill.addEventListener("click", () => {
    // for(let key in qty){
    //     if(qty[key] != 0){
    //         console.log(`${key} ${qty[key]} ${qty[key]*price[key]}`);
    //     }
    // }
    // console.log(`total: ${totalAmt}`);
    if(totalAmt ===0) bill.classList.toggle("hide1");
    else bill.classList.remove("hide1");
    for (let key in qty) {
        if (qty[key] != 0) {
            removeHide(rmap[key]);
            addPrice(rmap[key], qty[key], price[key]);
            updateQuantity(rmap[key], qty[key]);
        }else{
            addHide(rmap[key]);
        }
    }
    let gst = Math.round(totalAmt*0.18*100)/100;
    let st = Math.round(totalAmt*0.03*100)/100;
    document.querySelector(".amountrow").children[1].innerText = `₹${totalAmt}`;
    document.querySelector(".gstrow").children[1].innerText = `₹${gst}`;
    document.querySelector(".servicerow").children[1].innerText = `₹${st}`;
    document.querySelector(".payrow").children[1].innerText = `₹${Math.round((totalAmt + gst + st) * 100)/100}`;
});

function removeHide(val){
    for(let row of rows){
        if(row.getAttribute("id") === val){
            row.classList.remove("hide");
        }
    }
}

function addHide(val){
    for(let row of rows){
        if(row.getAttribute("id") === val){
            row.classList.add("hide");
        }
    }
}

function addPrice(att, qty, price){
    for(let row of rows){
        if(row.getAttribute("id") === att){
            row.children[3].innerText = `${qty*price}`;
        }
    }
}

function updateQuantity(att, qty){
    for(let row of rows){
        if(row.getAttribute("id") === att){
            row.children[1].innerText = `${qty}`;
        }
    }
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    alert("messege sended successfully");
    form.reset();
});
