
import missionTimelineImg from '../../public/missiontimelineimage.png';

export function MissionTimelinePanel() {
    return (
        <div className="relative w-full h-[700px] bg-[#050A14] rounded-xl overflow-hidden border border-[#4CC9F0]/20 shadow-2xl flex items-center justify-center p-4">
            <div className="relative w-full h-full"> 
                <img 
                    src={missionTimelineImg} 
                    alt="Mission Timeline" 
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
