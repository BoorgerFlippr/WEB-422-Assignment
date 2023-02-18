import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";

export function getStaticProps(){
    return new Promise((resolve,reject)=>{
        fetch('https://violet-gosling-hose.cyclic.app/api/movies/573a1399f29313caabceea14').then(res=>res.json()).then(data=>{
            resolve({props: {movie:data}})
        })
    })
}

export default function About(props) {
    console.log(props)
    return (
        <Card>
            <Card.Body>
                <PageHeader text="About the Developer : Glenn Parreno"/> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br/>
                <br/>
                I just really happen to like Quentin Tarantino films, my favourite among them is <a href="/movies/Pulp Fiction">"Pulp Fiction"</a>. Something about this film's 
                characters, dialogue, and overall vibe is just so fascinating. Also the twist where all the seemingly disjointed plotlines
                are actually connected is cool. 
                <br/>
                <br/>
            </Card.Body>
            <MovieDetails movie={props.movie}/>
        </Card>
    )
}