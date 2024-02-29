const dateFormat = (fbDate) => {
    const date = fbDate.toDate()
    const thisYear = new Date().getFullYear()
    const formattedDate = `${thisYear === date.getFullYear() ? '' : `${date.getFullYear()}년`}${date.getMonth() + 1}월 ${date.getDate()}일`;
    return formattedDate;
}

export default dateFormat;