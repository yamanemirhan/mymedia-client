import CreatePostForm from '@/components/forms/CreatePostForm'

export default function CreatePostPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Yeni Post Oluştur</h1>
      <CreatePostForm />
    </div>
  )
}
