/* ================= SCROLL ================= */
function scrollToCalc() {
  document.getElementById("calculator").scrollIntoView({
    behavior: "smooth"
  });
}

/* ================= ELEMENTS ================= */
// Result & Table
const result = document.getElementById("result");
const schedule = document.getElementById("schedule");

// Summary
const emiSpan = document.getElementById("emi");
const interestSpan = document.getElementById("interest");
const totalSpan = document.getElementById("total");

// Application box
const applicationBox = document.getElementById("applicationDetails");

// Applicant fields
const aName = document.getElementById("a_name");
const aEmail = document.getElementById("a_email");
const aMobile = document.getElementById("a_mobile");
const aEmployment = document.getElementById("a_employment");
const aIncome = document.getElementById("a_income");
const aCity = document.getElementById("a_city");
const aAmount = document.getElementById("a_amount");
const aTenure = document.getElementById("a_tenure");
const aType = document.getElementById("a_type");

/* ================= CURRENCY ================= */
const CURRENCY = "$";
function money(v) {
  return CURRENCY + v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* ================= FORM SUBMIT ================= */
document.getElementById("loanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  /* ---------- USER INPUT ---------- */
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const employment = document.getElementById("employment").value;
  const income = Number(document.getElementById("income").value);
  const city = document.getElementById("city").value;

  const P = Number(document.getElementById("amount").value); // Loan
  const N = Number(document.getElementById("tenure").value); // Months
  const type = document.getElementById("type").value;
  const R = 0.015; // 1.5% monthly

  /* ---------- SHOW APPLICATION DETAILS ---------- */
//   document.getElementById("loanForm").style.display = "none";
  applicationBox.classList.remove("hidden");

  aName.innerText = name;
  aEmail.innerText = email;
  aMobile.innerText = mobile;
  aEmployment.innerText = employment;
  aIncome.innerText = money(income);
  aCity.innerText = city;
  aAmount.innerText = money(P);
  aTenure.innerText = N + " Months";
  aType.innerText = type === "reducing"
    ? "Reducing Balance EMI"
    : "Fixed EMI";

  /* ---------- EMI CALCULATION ---------- */
  let emi = 0;
  let totalInterest = 0;
  let balance = P;
  let rows = "";
  const startDate = new Date();

  if (type === "reducing") {
    emi =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emi - interest;
      balance -= principal;
      totalInterest += interest;

      const due = new Date(startDate);
      due.setMonth(due.getMonth() + i);

      rows += `
        <tr>
          <td>${i}</td>
          <td>${due.toDateString()}</td>
          <td>${money(emi)}</td>
          <td>${money(principal)}</td>
          <td>${money(interest)}</td>
          <td>${money(Math.max(balance, 0))}</td>
        </tr>`;
    }
  } else {
    totalInterest = P * R * N;
    emi = (P + totalInterest) / N;

    const principal = P / N;
    const interest = totalInterest / N;

    for (let i = 1; i <= N; i++) {
      balance -= principal;

      const due = new Date(startDate);
      due.setMonth(due.getMonth() + i);

      rows += `
        <tr>
          <td>${i}</td>l
          <td>${due.toDateString()}</td>
          <td>${money(emi)}</td>
          <td>${money(principal)}</td>
          <td>${money(interest)}</td>
          <td>${money(Math.max(balance, 0))}</td>
        </tr>`;
    }
  }

  /* ---------- DISPLAY RESULTS ---------- */
//   emiSpan.innerText = money(emi);
//   interestSpan.innerText = money(totalInterest);
//   totalSpan.innerText = money(P + totalInterest);

  schedule.innerHTML = rows;
//   result.classList.remove("hidden");
});
