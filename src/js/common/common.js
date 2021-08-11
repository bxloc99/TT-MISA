function formatDate(dateOld){
    let date = new Date(dateOld),
    year = date.getFullYear().toString(),
    month = (date.getMonth() + 1).toString().padStart(2, '0'),
    day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}

function formatMoney(money) {
    if (money && !isNaN(money)) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    } else {
        return money;
    }
}