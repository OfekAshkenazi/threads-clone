import { useState } from "react"
import useShowToast from './useShowToast';

export default function usePreviewImage() {
    const [imageUrl, setImageUrl] = useState(null)
    const showToast = useShowToast()

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImageUrl(reader.result)
            }

            reader.readAsDataURL(file)
        } else {
            showToast("Invalid file type","File must be image","error")
            setImageUrl(null)
        }

    }

    return { handleImageChange, imageUrl }
}