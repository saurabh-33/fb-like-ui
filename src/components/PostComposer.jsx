import { Gif } from '@giphy/react-components';
import React, { useState, useEffect } from 'react'
import GifModal from './GifModal';
import styles from './PostComposer.module.css'

const PostComposer = (props) => {

	const [isGifModalActive, setGifModalState] = useState(false);

	const [msg, setMsg] = useState('');

	const [gifs, setGifs] = useState([]);

	const closePostComposer = () => {
		props.setPostComposerState(false);
	}

	const addNewPost = () => {
		const newPost = {
			msg: msg,
			gifs: [...gifs]
		};
		props.setPosts(prevPosts => [newPost, ...prevPosts]);
	}

	const setHtmlOverflowY = value => {
		const html = document.getElementsByTagName('html')[0];
		html.style.overflowY = value;
	}

	useEffect(
		() => {
			setHtmlOverflowY('hidden');
			return () => setHtmlOverflowY('auto');
		},
		[]
	);

	return (
		<div className={styles.backdrop}>
			<div className={styles.modal}>
				<div className={styles.composer}>
					<img src="../../assets/images/avatar.jpg" alt="profile" className={styles.profile} width='60' height='60' />
					<textarea 
						autoFocus
						value={msg}
						onChange={e => setMsg(e.target.value)}
						className={styles.textInput} 
					>
					</textarea>
					<div className={styles.gifContainer}>
						{
							gifs.map((gif, index) => <Gif key={index} gif={gif} width={100} noLink hideAttribution />)
						}
					</div>
					<div className={styles.addMediaContainer}>
						<div className={styles.addGIfWrapper}>
							<button className={styles.addGifBtn} onClick={() => setGifModalState(true)}>+ gif</button>
							{
								isGifModalActive && <GifModal setGifs={setGifs} />
							}
						</div>
					</div>
				</div>
				<div className={styles.btnGroup}>
					<button
						className={`${styles.btn} ${styles.postBtn}`}
						onClick={e => {
							addNewPost();
							closePostComposer();
						}}
					>
						Post
					</button>
					<button
						className={`${styles.btn} ${styles.cancelBtn}`}
						onClick={
							() => {
								closePostComposer()
							}}
					>
						Cancel
						</button>
				</div>
			</div>
		</div>
	)
}

export default PostComposer
