export const formatDate = (str) => {
    const d = new Date(str);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
};
