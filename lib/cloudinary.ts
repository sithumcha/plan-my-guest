export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

  // If using Cloudinary unsigned preset
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'plan_my_guest_unsigned');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.secure_url;
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
  }

  // Fallback placeholder image if upload service fails or unconfigured
  return 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200';
}
