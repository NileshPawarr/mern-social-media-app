import './closeFriend.scss';

export default function CloseFriend({ user }) {
  return (
    <li className='sidebarFriend'>
      <img src={user.profilePicture} alt='' className='sidebarFriendImg' />
      <span className='sdebarFriendName'>{user.username}</span>
    </li>
  );
}
