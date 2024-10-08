import { useState, useReducer, useEffect } from "react";
import "./App.css";

// components imports
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import { doc, collection, addDoc, setDoc, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInit";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_EXPENSES": {
      return {
        expenses: payload.expenses
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  const getData = async () => {
    const subscrb = onSnapshot(collection(db, "expenses"), (snapshot)=>{
      const expenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: "GET_EXPENSES", payload: { expenses } });
    });
    toast.success("Expenses retrived successfully.");
  };

  useEffect(() => {
    getData();
  }, []);

  const addExpense = async (expense) => {
    const expenseRef = collection(db, "expenses");
    await addDoc(expenseRef, expense);
    toast.success("Expense added successfully.");
  };

  const deleteExpense = async (id) => {
    // delete expense from firestore here
    await deleteDoc(doc(db, 'expenses', id))
    toast.success("Expense deleted successfully.");
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    const expensePos = state.expenses
      .map(function (exp) {
        return exp.id;
      })
      .indexOf(expense.id);

    if (expensePos === -1) {
      return false;
    }

    const expenseRef = doc(db, "expenses", expense.id);
    await setDoc(expenseRef, expense);
    toast.success("Expense updated successfully.");
  };

  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
