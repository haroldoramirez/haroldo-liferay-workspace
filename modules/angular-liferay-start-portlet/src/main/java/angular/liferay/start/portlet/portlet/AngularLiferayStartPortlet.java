package angular.liferay.start.portlet.portlet;

import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import java.io.IOException;

import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import angular.liferay.start.portlet.constants.AngularLiferayStartPortletKeys;

/**
 * @author berzerker-intel
 */
@Component(property = { 
	"com.liferay.portlet.display-category=angular",
	"com.liferay.portlet.instanceable=true", "javax.portlet.init-param.template-path=/",
	"javax.portlet.init-param.view-template=/view.jsp",
	"javax.portlet.name=" + AngularLiferayStartPortletKeys.AngularLiferayStartPortlet,
	"javax.portlet.resource-bundle=content.Language",
	"javax.portlet.security-role-ref=power-user,user" }, 
service = Portlet.class)
public class AngularLiferayStartPortlet extends MVCPortlet {

	@Override
	public void doView(RenderRequest renderRequest, RenderResponse renderResponse) throws IOException, PortletException {
		
		//O método doView é executado toda vez que o Liferay vai desenhar o portlet na tela

		//Resolve o caminho completo do ponto de entrada definido no seu package.json
		renderRequest.setAttribute("mainRequire", _npmResolver.resolveModuleName("angular-liferay-start-portlet") + " as main");

		super.doView(renderRequest, renderResponse);
		
	}

	@Reference
	private NPMResolver _npmResolver;

}