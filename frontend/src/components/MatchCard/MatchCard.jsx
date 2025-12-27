import './MatchCard.css'

function MatchCard({ match }) {
  return (
    <div className="match-card">
      <h3>{match.title}</h3>
      <p>{match.description}</p>
    </div>
  )
}

export default MatchCard

