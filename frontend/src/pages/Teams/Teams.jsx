import { useState, useEffect } from 'react'
import { getTeams } from '../../api/teams.api'
import './Teams.css'

function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      const response = await getTeams()
      if (response.success) {
        setTeams(response.data || [])
      } else {
        // Fallback to mock data for development
        setTeams([
          {
            _id: '1',
            name: 'Internal Maintenance',
            member: 'Anas Makari',
            company: 'My Company (San Francisco)'
          },
          {
            _id: '2',
            name: 'Metrology',
            member: 'Marc Demo',
            company: 'My Company (San Francisco)'
          },
          {
            _id: '3',
            name: 'Subcontractor',
            member: 'Maggie Davidson',
            company: 'My Company (San Francisco)'
          }
        ])
      }
    } catch (error) {
      console.error('Error loading teams:', error)
      // Fallback to mock data
      setTeams([
        {
          _id: '1',
          name: 'Internal Maintenance',
          member: 'Anas Makari',
          company: 'My Company (San Francisco)'
        },
        {
          _id: '2',
          name: 'Metrology',
          member: 'Marc Demo',
          company: 'My Company (San Francisco)'
        },
        {
          _id: '3',
          name: 'Subcontractor',
          member: 'Maggie Davidson',
          company: 'My Company (San Francisco)'
        }
      ])
    }
  }

  const handleNew = () => {
    // TODO: Navigate to team form when implemented
    console.log('New team - to be implemented')
  }

  return (
    <div className="teams-page">
      <div className="app-window">
        <div className="header">
          <button className="new-btn" onClick={handleNew}>New</button>
          <h2>Teams</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Members</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id || team.id}>
                <td>{team.name}</td>
                <td>{team.member || team.members}</td>
                <td>{team.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teams

