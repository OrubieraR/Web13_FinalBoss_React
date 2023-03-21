import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserAdvert } from '../../store/slices/adverts';
import '../../style/profile.css';
import DeleteAccount from './DeleteAccount';
import { Link } from 'react-router-dom';
//import FavoritesPage from "./Favorites";

const EmptyList = () => {
	return (
		<div>
			<p>{i18n.t('No products')}</p>
		</div>
	);
};

const ProfilePage = () => {
	const { userInfo } = useSelector((state) => state.user);
	const [t] = useTranslation('translation');
	const userOwner = userInfo?.name;
	const dispatch = useDispatch();
	const url = process.env.REACT_APP_URL_PHOTO;

	//Traer los anuncios
	useEffect(() => {
		dispatch(getUserAdvert(userOwner));
	}, [dispatch, userOwner]);

	const userAdverts = useSelector((state) => state.adverts.list);

	const [visible, setVisible] = useState(2);
	const [isCompleted, setIsCompleted] = useState(false);
	const allGames = userAdverts.length;

	const showMoreGames = () => {
		setVisible((prevValue) => {
			const nextGames = prevValue + 6;
			if (nextGames > allGames) {
				setIsCompleted(true);
				return allGames;
			}
			return nextGames;
		});
	};

	return (
		<section className='profile-page'>
			<div>
				<nav className='nav-profile'>
					<NavLink className='nav-user' to='/user-profile/my-favorites'>
						| {t('Favourites')} |
					</NavLink>
					<NavLink className='nav-user'>| {t('Reserved')} |</NavLink>
				</nav>
			</div>
			<div className='profile-data'>
				<section>
					<figure src={'img/uwu-profile.png'} alt='avatar'>
						{userInfo?.name}
					</figure>
					<ul>
						<li>
							{t('Name')} : {userInfo?.name}
						</li>
						<li>
							{t('Email')} : {userInfo?.email}
						</li>
					</ul>
					<div>
						<NavLink> {t('Edit profile')}</NavLink>
					</div>
					<div>
						<DeleteAccount />
					</div>
				</section>
				<section className='my-adverts'>
					<h1>{t('My Adverts')}</h1>
					<div className='advertsPage'>
						{allGames > 0 ? (
							<ul className='advertsPage-list'>
								{userAdverts?.slice(0, visible).map((item) => (
									<li className='advertsPage-item' key={item._id}>
										<Link className='linkDetail' to={`/${item._id}`}>
											<div className='AdvertDetail-photo'>
												{item.photo ? (
													<img src={url + item.photo} alt={item.photo} />
												) : (
													<img
														src={'img/image-coming-soon.jpg'}
														alt='coming-soon'
													/>
												)}
											</div>
											<p>{item.name}</p>
											<p>
												{t('Price')}: {item.price}$
											</p>
											<p>
												{t('State')}: {item.sale ? t('On sale') : t('Buying')}
											</p>
											<p>
												{' '}
												{t('Category')}: {item.category.toString()}{' '}
											</p>
										</Link>
									</li>
								))}
							</ul>
						) : (
							<EmptyList />
						)}
					</div>
					<div>
						<button onClick={showMoreGames} disabled={isCompleted}>
							Load More {visible}/{allGames}
						</button>
					</div>
				</section>
			</div>
		</section>
	);
};

export default ProfilePage;
