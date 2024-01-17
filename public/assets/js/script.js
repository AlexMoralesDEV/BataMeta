let escolherMeta = document.querySelector('#escolherMeta');

escolherMeta.addEventListener('change' , (e) => {
    console.log(escolherMeta.value)
    window.location.href = escolherMeta.value;
})