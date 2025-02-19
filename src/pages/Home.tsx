import { Link } from "react-router-dom";

const languages = [
    { name: "JavaScript", slug: "javascript", color: "bg-purple-400", logo: "/logos/javascript.png" },
    { name: "Python", slug: "python", color: "bg-orange-400", logo: "/logos/python.png" },
    { name: "Java", slug: "java", color: "bg-red-400", logo: "/logos/java.png" },
    { name: "C++", slug: "cpp", color: "bg-purple-500", logo: "/logos/cpp.png" },
    { name: "TypeScript", slug: "typescript", color: "bg-indigo-500", logo: "/logos/typescript.png" },
    { name: "Go", slug: "go", color: "bg-orange-500", logo: "/logos/go.png" },
    { name: "Rust", slug: "rust", color: "bg-cyan-500", logo: "/logos/rust.png" },
    { name: "Swift", slug: "swift", color: "bg-blue-500", logo: "/logos/swift.png" },
    { name: "Kotlin", slug: "kotlin", color: "bg-yellow-400", logo: "/logos/kotlin.png" },
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kickstart Your Coding Journey 🚀</h1>
            <p className="text-lg text-gray-600 mb-8">
                Select a programming language to start answering quick questions!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {languages.map((lang) => (
                    <Link
                        key={lang.slug}
                        to={`/quiz/${lang.slug}`}
                        className={`p-6 w-64 text-center text-black rounded-lg shadow-md ${lang.color} hover:opacity-80 transition`}
                    >
                        <img src={lang.logo} alt={lang.name} className="w-16 h-16 mb-3" />
                        <span className="text-xl font-semibold">{lang.name}</span>
                    </Link>
                ))}
            </div>
            <Link to="/all-languages">
                <button className="mt-8 px-6 py-3 bg-gray-800 text-white text-lg rounded-lg shadow-md hover:bg-gray-700 transition">
                    See More →
                </button>
            </Link>
        </div>
    );
};

export default Home;
