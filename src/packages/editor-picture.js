import html2canvas from 'html2canvas'

export function savePicture(imgBoxRef) {
    const saveImg = () => {
        html2canvas(imgBoxRef.value, {
            height: imgBoxRef.value.scrollHeight,
            width: imgBoxRef.value.scrollWidth,
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "Button.png";
            link.href = canvas.toDataURL();
            link.click();
        })
    }
    return {
        saveImg
    }
}