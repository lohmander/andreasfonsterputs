test-wagtail:
	(cd wagtail && python manage.py test)

test-nextjs:
	echo "No tests atm"

build-wagtail-image:
	(cd wagtail && docker build -t docker.pkg.github.com/aldowntown/hemforbattringen/wagtail-hemforbattringen .)

build-nextjs-image:
	(cd nextjs && docker build -t docker.pkg.github.com/aldowntown/hemforbattringen/nextjs-hemforbattringen .)

build-images: build-wagtail-image build-nextjs-image

push-wagtail-image:
	docker tag docker.pkg.github.com/aldowntown/hemforbattringen/wagtail-hemforbattringen docker.pkg.github.com/aldowntown/hemforbattringen/wagtail-hemforbattringen:${VERSION}
	docker push docker.pkg.github.com/aldowntown/hemforbattringen/wagtail-hemforbattringen:${VERSION}

push-nextjs-image:
	docker tag docker.pkg.github.com/aldowntown/hemforbattringen/nextjs-hemforbattringen docker.pkg.github.com/aldowntown/hemforbattringen/nextjs-hemforbattringen:${VERSION}
	docker push docker.pkg.github.com/aldowntown/hemforbattringen/nextjs-hemforbattringen:${VERSION}