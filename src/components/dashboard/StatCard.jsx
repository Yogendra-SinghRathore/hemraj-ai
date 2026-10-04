
const StatCard = ({ state }) => {

    const Icon = state.icon;

    return (
        <div className='stat-card'>
            <div className="stat-card-top">
                <span className='stat-title'>{state.title}</span>

                <div className={`stat-icon stat-icon-${state.variant}`}>
                    {Icon && <Icon size={20} />}
                </div>
            </div>
            <h2 className='stat-value'>{state.value}</h2>
        </div>
    )
}

export default StatCard
