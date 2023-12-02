const formatData = (x) => {
    if (x.length === 1) {return (`0${x}`)}
    return x
}

const dateGenerator = () =>{

    const now = new Date();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = formatData(now.getMinutes())
    const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
    ];
    const month = monthNames[now.getMonth()];
    const actualDate= `${day}/${month} ${hours}:${minutes}`;

    return actualDate;
}

export default dateGenerator;