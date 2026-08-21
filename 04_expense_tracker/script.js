document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expense-form');
  const inputExpenseName = document.getElementById('expense-name');
  const inputExpenseAmt = document.getElementById('expense-amount');
  const addButton = document.getElementById('add-btn');
  const ulExpList = document.getElementById('expense-list');
  const totalAmt = document.getElementById('total-amount');

  let expenses = JSON.parse(localStorage.getItem("expensesKey")) || [];
  expenses.forEach((item) => {
    renderDisplayExpense(item);
  });
  calcTotal();
  
  // localStorage.getItem("expensesKey");      //returns JSON string
  // JSON.parse(localStorage.getItem("expensesKey"));      // JSON string to JS object (array)
  

  form.addEventListener('submit', (e) => {
    e.preventDefault();  // stops form submission as form submission leads to page refresh
    
    const expense = {
    id: Date.now(),
    name: inputExpenseName.value.trim(),
    amount: Number(inputExpenseAmt.value)      // since input.value always returns STRING
    }
    // console.log(expense);
    
    addExpense(expense);    
    // console.log(expenses);

    calcTotal();


    renderDisplayExpense(expense);
    
  });

  // Delete ke liye event listener ulList pe lagayege, delete-btn pe nahi , kyuki event object har ek delete button ko uniquely identify kar sakta hai, but agar hamne delete-btn pe lagaya toh har ek btn pe alag alag event listeners lagane padege (event object use hi nahi ho payega), isse acha event object ko use karte hai
  // Event Delegation
  // Delete ka event listener UL par lagate hain, har delete button par nahi.
  // Reason: Delete buttons dynamically create hote hain, aur click event
  // bubbling ki wajah se UL tak aa jata hai.
  // e.target se pata chal jata hai ki exactly kaunsa delete button click hua,
  // isliye ek hi listener sabhi current aur future buttons ko handle kar leta hai.

  ulExpList.addEventListener('click' , (e) => {
    // console.log(`i am ${e.target.tagName}`);
    if (e.target.tagName === "BUTTON") {
      const id = Number(e.target.getAttribute("data-id"));   //string return krta h so type conversion
      DeleteExpense(id , e.target);
    }
  });


  function addExpense(expense) {
    if (typeof expense.name === "string" && typeof expense.amount === "number" && expense.amount >= 0 && !Number.isNaN(expense.amount)) {
      expenses.push(expense);

      saveToLocal();

      inputExpenseName.value = ""     // clear input
      inputExpenseAmt.value = ""
    }
  }

  function calcTotal() {
    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);     // can also use forEach
    totalAmt.textContent = total;
  }

  function renderDisplayExpense(expense) {
    const li = document.createElement('li');
    // console.log(expense);

    // li.textContent = `${expense.name} - $${expense.amount}`;
    li.innerHTML = `<span>${expense.name} - $${expense.amount}</span>  
                    <button data-id='${expense.id}'>Delete</button>`

    ulExpList.append(li);

  }

  function DeleteExpense(id ,button) {
    //id ke basis pe array se delete karo

    //updating array 
    expenses = expenses.filter((expense) => (expense.id !== id));       //expense filter method ke callback ka parameter hai, isliye automatically accessible hai
    
    // updating UI
    button.parentElement.remove();
  
    calcTotal();
    saveToLocal();
  }

  function saveToLocal() {
    localStorage.setItem("expensesKey", JSON.stringify(expenses));    // RAM to Local
  }

});