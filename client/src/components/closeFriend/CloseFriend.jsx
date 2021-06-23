import './closeFriend.scss';

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='sidebarFriend'>
      <img src={PF + user.profilePicture} alt='' className='sidebarFriendImg' />
      <span className='sdebarFriendName'>{user.username}</span>
    </li>
  );
}
