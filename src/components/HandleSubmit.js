export default function HandleSubmit(event) {
    // Since we don't want to reload the page
    event.preventDefault();

    const formData = new FormData(event.target);

    window.alert(`You have inputted in: ${formData.get("myCity")}`);
}