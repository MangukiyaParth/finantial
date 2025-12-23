function scrollToCalc() {
  document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
}

const emiSpan = document.getElementById("emi");
const interestSpan = document.getElementById("interest");
const totalSpan = document.getElementById("total");
const schedule = document.getElementById("schedule");
const result = document.getElementById("result");

document.getElementById("loanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const P = Number(document.getElementById("amount").value);
  const N = Number(document.getElementById("tenure").value);
  const R = 0.015;
  const type = document.getElementById("type").value;

  let emi = 0, totalInterest = 0, balance = P;
  let rows = "";
  const start = new Date();

  if (type === "reducing") {
    emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emi - interest;
      balance -= principal;
      totalInterest += interest;

      const d = new Date(start);
      d.setMonth(d.getMonth() + i);

      rows += `
        <tr>
          <td>${i}</td>
          <td>${d.toDateString()}</td>
          <td>$${emi.toFixed(2)}</td>
          <td>$${principal.toFixed(2)}</td>
          <td>$${interest.toFixed(2)}</td>
          <td>$${Math.max(balance, 0).toFixed(2)}</td>
        </tr>`;
    }
  } else {
    totalInterest = P * R * N;
    emi = (P + totalInterest) / N;

    const principal = P / N;
    const interest = totalInterest / N;

    for (let i = 1; i <= N; i++) {
      balance -= principal;
      const d = new Date(start);
      d.setMonth(d.getMonth() + i);

      rows += `
        <tr>
          <td>${i}</td>
          <td>${d.toDateString()}</td>
          <td>$${emi.toFixed(2)}</td>
          <td>$${principal.toFixed(2)}</td>
          <td>$${interest.toFixed(2)}</td>
          <td>$${Math.max(balance, 0).toFixed(2)}</td>
        </tr>`;
    }
  }

  emiSpan.innerText = "$" + emi.toFixed(2);
  interestSpan.innerText = "$" + totalInterest.toFixed(2);
  totalSpan.innerText = "$" + (P + totalInterest).toFixed(2);
  schedule.innerHTML = rows;
  result.classList.remove("hidden");
});
