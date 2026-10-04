import { Activity } from "lucide-react"

const RecentActivity = ({ activities }) => {
    return (
        <section className="dashboard-panel">
            <div className="panel-header">
                <div>
                    <h3>Recent Agent Activity</h3>
                    <p>Latest Finance Agent operations</p>
                </div>
            </div>

            <div className="activity-list">
                {activities.length === 0 ? (<p className="empty-message">No recent activity</p>) : (

                    activities.map((activity) => (
                        <div className="activity-item" key={activity.id}>
                            <div className="activity-icon">
                                <Activity size={16} />
                            </div>

                            <div className="activity-details">
                                <p>{activity.message}</p>
                                <span>{activity.time}</span>
                            </div>
                        </div>
                    ))

                )}
            </div>
        </section>
    )
}

export default RecentActivity
