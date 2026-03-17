let edicao = null;

const form = document.getElementById("transaction-form");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const nameInput = document.getElementById("transaction-name");
  const name = nameInput.value;

  const valueInput = document.getElementById("transaction-amount");
  const value = Number(valueInput.value);

  const newTransaction = {
    nome: name,
    valor: value,
  };

  if (edicao === null) {
    await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });
  } else {
    await fetch(`http://localhost:3000/transactions/${edicao}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });
  }

  await buscarTransacoes();
  nameInput.value = "";
  valueInput.value = "";
  edicao = null;
});

async function buscarTransacoes() {
  const response = await fetch("http://localhost:3000/transactions");
  const transactions = await response.json();

  console.log(transactions);

  const transactionsBody = document.getElementById("transactions-body");
  transactionsBody.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.innerText = transaction.nome;
    const valueCell = document.createElement("td");
    valueCell.innerText = transaction.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    valueCell.classList.add("transaction-value");

    const actionsCell = document.createElement("td");
    actionsCell.classList.add("actions-cell");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Excluir";
    deleteButton.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/transactions/${transaction.id}`, {
        method: "DELETE",
      });
      await buscarTransacoes();
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerText = "Editar";
    editButton.addEventListener("click", () => {
      const nameInput = document.getElementById("transaction-name");
      const valueInput = document.getElementById("transaction-amount");

      edicao = transaction.id;
      nameInput.value = transaction.nome;
      valueInput.value = transaction.valor;
    });

    actionsCell.append(deleteButton);
    actionsCell.append(editButton);

    if (transaction.valor >= 0) {
      valueCell.classList.add("valor-positivo");
    } else {
      valueCell.classList.add("valor-negativo");
    }

    row.append(nameCell);
    row.append(valueCell);
    row.append(actionsCell);
    transactionsBody.append(row);
  });

  const total = transactions.reduce((acc, item) => {
    return acc + item.valor;
  }, 0);

  const balance = document.getElementById("balance");
  balance.innerText = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buscarTransacoes();
});
