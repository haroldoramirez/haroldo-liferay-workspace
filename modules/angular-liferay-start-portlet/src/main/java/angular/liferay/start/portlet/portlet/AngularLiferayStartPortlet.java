package angular.liferay.start.portlet.portlet;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import javax.portlet.Portlet;
import org.osgi.service.component.annotations.Component;
import angular.liferay.start.portlet.constants.AngularLiferayStartPortletKeys;

/**
 * @author berzerker-intel
 */
@Component(
		property = {
			"com.liferay.portlet.display-category=Angular",
			"com.liferay.portlet.instanceable=true",
			"javax.portlet.init-param.template-path=/",
			"javax.portlet.init-param.view-template=/view.jsp",
			"javax.portlet.name=" + AngularLiferayStartPortletKeys.AngularLiferayStartPortlet,
			"javax.portlet.resource-bundle=content.Language",
			"javax.portlet.security-role-ref=power-user,user"
		},
		service = Portlet.class
	)
public class AngularLiferayStartPortlet extends MVCPortlet {
}