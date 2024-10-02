
import { User } from '@/lib/models/User';
import BlogModel from '@/lib/models/BlogModel'; // Assurez-vous d'importer le modèle Blog également
import { ConnectDB } from "@/lib/config/db"; // Importez la fonction ConnectDB si ce n'est pas déjà fait
import Blogitem from '../Components/Blogitem';


async function getAuthorsWithBlogs() {
  await ConnectDB();

  const authors = await User.find({ role: 'user' });
  const authorsWithBlogs = [];

  for (const author of authors) {
    const blogs = await BlogModel.find({ authorEmail: author.email });
    if (blogs.length > 0) {
      authorsWithBlogs.push({
        ...author.toObject(),
        blogs: blogs
      });
    }
  }

  return authorsWithBlogs;
}

export default async function AuthorPage() {
  const authorsWithBlogs = await getAuthorsWithBlogs();

  return (
    <>
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos auteurs</h1>
      {authorsWithBlogs.map((author) => (
        <div key={author._id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{author.name}</h2>
          <p className="mb-4">Nombre de blogs : {author.blogs.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {author.blogs.map((blog) => (
              <Blogitem
                key={blog._id}
                id={blog._id}
                image={blog.image}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                date={blog.date}
                authorEmail={blog.email}
                name={author.name}
                tags={blog.tags}
              />
            ))}
          </div>
        </div>
    
      ))}
    </div>
    </>
  );
}